import os

file_path = r'c:\Users\HP\Downloads\mathlock-vercel\src\MathLock.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Ensure Badge Gallery and Exam Sim buttons are in the Roadmap tab
roadmap_tab_end = '        </div>\n      )}'
# Find the end of the roadmap tab block
# The tabs are structured like: {activeTab === "roadmap" && ( ... )}

roadmap_end_index = content.rfind('{activeTab === "roadmap" && (')
if roadmap_end_index != -1:
    block_end = content.find('      )}', roadmap_end_index)
    if block_end != -1:
        # Insert before the last )}
        insertion = """          <div style={{ padding: 12, borderTop: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
            <button onClick={() => setModal("examSim")} style={{ flex: 1, background: "rgba(56,189,248,0.15)", border: `1px solid ${C.blue}`, color: C.blue, padding: "10px", borderRadius: 8, fontSize: 11, fontWeight: 900, cursor: "pointer" }}>📝 EXAM SIMULATION</button>
            <button onClick={() => setModal("reset")} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, padding: "10px", borderRadius: 8, fontSize: 11, cursor: "pointer" }}>🗑️ RESET</button>
          </div>
          <div style={{ padding: 12, borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.muted, marginBottom: 8 }}>MY BADGES</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {BADGES.map(b => {
                const isLocked = !badges.includes(b.id);
                return (
                  <div key={b.id} title={b.desc} style={{ width: 44, height: 44, borderRadius: "50%", background: isLocked ? C.surface2 : `${b.color}22`, border: `2px solid ${isLocked ? C.border : b.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, opacity: isLocked ? 0.3 : 1, filter: isLocked ? "grayscale(1)" : "none", transition: "all 0.3s" }}>
                    {b.icon}
                  </div>
                );
              })}
            </div>
          </div>
"""
        # We need to find the correct insertion point. The block is:
        # {activeTab === "roadmap" && (
        #   <div ...>
        #     ...
        #   </div>
        # )}
        inner_div_end = content.find('          </div>', roadmap_end_index + 30) # Skip the first div
        # Actually search for the one before the closing )}
        # Let's just find the last </div> before block_end
        last_div_end = content.rfind('          </div>', roadmap_end_index, block_end)
        if last_div_end != -1:
            content = content[:last_div_end] + insertion + content[last_div_end:]

# 2. Add Reset Modal
reset_modal = """      {modal === "reset" && (
        <Modal borderColor={C.red}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
          <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8, color: C.red }}>RESET DATA?</h2>
          <p style={{ color: C.muted, fontSize: 12, marginBottom: 20 }}>This will erase ALL progress for this subject. This cannot be undone.</p>
          <button onClick={resetAllData} style={{ width: "100%", background: C.red, color: "#fff", border: "none", padding: 14, borderRadius: 10, fontWeight: 900, cursor: "pointer", marginBottom: 8 }}>DELETE EVERYTHING</button>
          <button onClick={() => setModal(null)} style={{ width: "100%", background: "transparent", color: C.muted, border: `1px solid ${C.border}`, padding: 11, borderRadius: 10, cursor: "pointer", fontSize: 12 }}>CANCEL</button>
        </Modal>
      )}
"""
modal_insertion_point = content.find('{modal === "examSim" && (')
if modal_insertion_point != -1:
    content = content[:modal_insertion_point] + reset_modal + content[modal_insertion_point:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Final UI adjustments applied.")
