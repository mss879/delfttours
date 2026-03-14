'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// ============================================================
// PIPELINE ACTIONS
// ============================================================

export async function getPipelines() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pipelines')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function createPipeline(name: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pipelines')
    .insert({ name })
    .select()
    .single()
  if (error) throw error
  revalidatePath('/admin/dashboard/crm')
  return data
}

export async function deletePipeline(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('pipelines').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/dashboard/crm')
}

// ============================================================
// STAGE ACTIONS
// ============================================================

export async function getStages(pipelineId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pipeline_stages')
    .select('*')
    .eq('pipeline_id', pipelineId)
    .order('position', { ascending: true })
  if (error) throw error
  return data
}

export async function createStage(pipelineId: string, name: string, color: string) {
  const supabase = await createClient()

  // Get max position
  const { data: existing } = await supabase
    .from('pipeline_stages')
    .select('position')
    .eq('pipeline_id', pipelineId)
    .order('position', { ascending: false })
    .limit(1)

  const nextPosition = existing && existing.length > 0 ? existing[0].position + 1 : 0

  const { data, error } = await supabase
    .from('pipeline_stages')
    .insert({ pipeline_id: pipelineId, name, color, position: nextPosition })
    .select()
    .single()
  if (error) throw error
  revalidatePath('/admin/dashboard/crm')
  return data
}

export async function updateStage(id: string, updates: { name?: string; color?: string }) {
  const supabase = await createClient()
  const { error } = await supabase.from('pipeline_stages').update(updates).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/dashboard/crm')
}

export async function deleteStage(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('pipeline_stages').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/dashboard/crm')
}

// ============================================================
// LEAD ACTIONS
// ============================================================

export async function getLeads(pipelineId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('pipeline_id', pipelineId)
    .order('position', { ascending: true })
  if (error) throw error
  return data
}

export interface CreateLeadInput {
  pipeline_id: string
  stage_id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  notes?: string
  value?: number
  source?: string
  inquiry_id?: string
}

export async function createLead(input: CreateLeadInput) {
  const supabase = await createClient()

  // Get max position in this stage
  const { data: existing } = await supabase
    .from('leads')
    .select('position')
    .eq('stage_id', input.stage_id)
    .order('position', { ascending: false })
    .limit(1)

  const nextPosition = existing && existing.length > 0 ? existing[0].position + 1 : 0

  const { data, error } = await supabase
    .from('leads')
    .insert({ ...input, position: nextPosition })
    .select()
    .single()
  if (error) throw error
  revalidatePath('/admin/dashboard/crm')
  return data
}

export async function updateLead(id: string, updates: Partial<CreateLeadInput>) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('leads')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
  revalidatePath('/admin/dashboard/crm')
}

export async function moveLeadToStage(leadId: string, newStageId: string, newPosition: number) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('leads')
    .update({
      stage_id: newStageId,
      position: newPosition,
      updated_at: new Date().toISOString(),
    })
    .eq('id', leadId)
  if (error) throw error
  revalidatePath('/admin/dashboard/crm')
}

export async function deleteLead(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('leads').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/dashboard/crm')
}

// ============================================================
// INQUIRY ACTIONS
// ============================================================

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/dashboard/inquiries')
}

export async function convertInquiryToLead(
  inquiryId: string,
  pipelineId: string,
  stageId: string
) {
  const supabase = await createClient()

  // Fetch inquiry data
  const { data: inquiry, error: fetchError } = await supabase
    .from('inquiries')
    .select('*')
    .eq('id', inquiryId)
    .single()
  if (fetchError || !inquiry) throw fetchError || new Error('Inquiry not found')

  // Create lead from inquiry
  await createLead({
    pipeline_id: pipelineId,
    stage_id: stageId,
    first_name: inquiry.first_name,
    last_name: inquiry.last_name,
    email: inquiry.email,
    phone: inquiry.phone,
    notes: inquiry.message,
    source: 'inquiry',
    inquiry_id: inquiryId,
  })

  // Mark inquiry as converted
  const { error: updateError } = await supabase
    .from('inquiries')
    .update({ converted_to_lead: true, status: 'contacted' })
    .eq('id', inquiryId)
  if (updateError) throw updateError

  revalidatePath('/admin/dashboard/inquiries')
  revalidatePath('/admin/dashboard/crm')
}

// ============================================================
// DASHBOARD STATS
// ============================================================

export async function getDashboardStats() {
  const supabase = await createClient()

  const [inquiriesRes, leadsRes] = await Promise.all([
    supabase.from('inquiries').select('id, status, created_at, converted_to_lead'),
    supabase.from('leads').select('id, created_at, value'),
  ])

  const inquiries = inquiriesRes.data || []
  const leads = leadsRes.data || []

  const totalInquiries = inquiries.length
  const pendingInquiries = inquiries.filter((i: any) => i.status === 'pending').length
  const contactedInquiries = inquiries.filter((i: any) => i.status === 'contacted').length
  const convertedInquiries = inquiries.filter((i: any) => i.converted_to_lead).length
  const totalLeads = leads.length
  const totalValue = leads.reduce((sum: number, l: any) => sum + (parseFloat(l.value) || 0), 0)

  // Monthly inquiry trend (last 6 months)
  const monthlyTrend: { month: string; inquiries: number; leads: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthStr = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    const year = date.getFullYear()
    const month = date.getMonth()

    const monthInquiries = inquiries.filter((item: any) => {
      const d = new Date(item.created_at)
      return d.getFullYear() === year && d.getMonth() === month
    }).length

    const monthLeads = leads.filter((item: any) => {
      const d = new Date(item.created_at)
      return d.getFullYear() === year && d.getMonth() === month
    }).length

    monthlyTrend.push({ month: monthStr, inquiries: monthInquiries, leads: monthLeads })
  }

  return {
    totalInquiries,
    pendingInquiries,
    contactedInquiries,
    convertedInquiries,
    totalLeads,
    totalValue,
    monthlyTrend,
  }
}
