import re
import sys

# Handling utf-8 output on windows terminal if needed
sys.stdout.reconfigure(encoding='utf-8')

file_path = 'app/tours/tour-data.ts'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
except Exception as e:
    print(f"Error reading file: {e}")
    exit(1)

# Regex to find id and title
pattern = r'"id":\s*"(.*?)",\s*\r?\n\s*"title":\s*"(.*?)"'
matches = re.finditer(pattern, content)

for m in matches:
    print(f"{m.group(1)}|{m.group(2)}")
