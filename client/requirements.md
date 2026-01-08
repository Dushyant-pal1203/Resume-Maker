## Packages
react-to-print | For generating PDF from the resume preview component
framer-motion | For smooth UI transitions and animations
uuid | For generating unique IDs for list items (experience, projects, etc.)
clsx | For conditional class merging (utility)
tailwind-merge | For merging tailwind classes safely

## Notes
ATS Check connects to POST /api/ai/ats-check
Resume auto-save connects to PUT /api/resumes/:id
Resume content is stored as JSONB in the 'content' column
Split screen layout: Editor (Left) / Preview (Right)
