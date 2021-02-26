export default function Address({
  szamlazasiCimIranyitoszam,
  szamlazasiCimTelepulesNev,
  szamlazasiCimKozteruletNev,
  szamlazasiCimKozteruletJellegNev,
  szamlazasiCimHazszam,
  szamlazasiCimEpulet,
}) {
  return `${szamlazasiCimIranyitoszam} ${szamlazasiCimTelepulesNev}, ${szamlazasiCimKozteruletNev} ${szamlazasiCimKozteruletJellegNev} ${szamlazasiCimHazszam} ${szamlazasiCimEpulet}`
}
