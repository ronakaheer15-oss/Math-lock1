import os

file_path = r'c:\Users\HP\Downloads\mathlock-vercel\src\MathLock.jsx'

# Read as UTF-8
with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

new_header = [
    "import { useState, useEffect, useRef } from 'react';\n",
    "import { useStore } from \"./store\";\n",
    "import { supabase } from \"./supabase\";\n",
    "import Auth from \"./Auth\";\n",
    "import { SUBJECTS, SUBJECT_LIST, getRoadmap, getMeta, getDaysLeft as getSubjectDaysLeft } from './data/subjects';\n",
    "\n",
    "// ─── UTILITIES & CONSTANTS ────────────────────────────────────────────────\n"
]

# PHASES with correct emojis
phases_lines = [
    "const PHASES = [\n",
    "  { name: \"📖 READ\", full: \"Read the concept carefully once\", duration: 10 * 60, color: \"#f0c040\" },\n",
    "  { name: \"✏️ PRACTICE\", full: \"Solve problems with notes open\", duration: 20 * 60, color: \"#ff6b35\" },\n",
    "  { name: \"🧠 RECALL BLIND\", full: \"Close notes. Solve from memory.\", duration: 30 * 60, color: \"#39ff7a\" },\n",
    "  { name: \"🔁 REVIEW\", full: \"Check answers. Fix mistakes.\", duration: 20 * 60, color: \"#a78bfa\" },\n",
    "];\n",
    "\n"
]

# Find where the old PHASES block or corrupted stuff starts
# The previous cleanup kept lines [0..5] which are imports
# Then it had mojibake PHASES

# We reconstructed the file starting from line 7 (index 6) in the 'keep' array
body = lines[6:] 

# Let's fix common corrupted characters in the body
def fix_mojibake(text):
    corrupt_map = {
        "ðŸ“–": "📖",
        "âœ ï¸ ": "✏️",
        "ðŸ§ ": "🧠",
        "ðŸ” ": "🔁",
        "ðŸ”¥": "🔥",
        "ðŸ†˜": "🆘",
        "âœ“": "✅",
        "ðŸ’¡": "💡",
        "ðŸ“š": "📚",
        "âš¡": "⚡",
        "ðŸ¤–": "🤖",
        "ðŸ“ ": "📝",
        "ðŸ—“": "📅",
        "ðŸ“Œ": "📌",
        "ðŸ“•": "📕",
        "ðŸ˜„": "😄",
        "âŒ‚": "🏠",
        "â–¶": "▶",
        "â ¸": "⏸",
        "â†’": "→",
        "âœ•": "✕",
        "â€”": "—",
        "â”€": "─"
    }
    for old, new in corrupt_map.items():
        text = text.replace(old, new)
    return text

fixed_body = [fix_mojibake(line) for line in body]

# Combine everything
final_content = new_header + phases_lines + fixed_body

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(final_content)

print("Successfully fixed encoding and added Subject Selector imports.")
