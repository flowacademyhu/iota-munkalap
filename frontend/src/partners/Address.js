export default function Address({ partner }) {
  const {
    szamlazasiCimIranyitoszam,
    szamlazasiCimTelepulesNev,
    szamlazasiCimKozteruletNev,
    szamlazasiCimKozteruletJellegNev,
    szamlazasiCimHazszam,
    szamlazasiCimEpulet,
  } = partner
  return (
    <>
      {`${szamlazasiCimIranyitoszam} ${szamlazasiCimTelepulesNev}, ${szamlazasiCimKozteruletNev} ${szamlazasiCimKozteruletJellegNev} ${szamlazasiCimHazszam} ${szamlazasiCimEpulet}`}
    </>
  )
}
