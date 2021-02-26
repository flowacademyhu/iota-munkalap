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
    <td>
      {`${szamlazasiCimIranyitoszam} ${szamlazasiCimTelepulesNev}, ${szamlazasiCimKozteruletNev} ${szamlazasiCimKozteruletJellegNev} ${szamlazasiCimHazszam} ${szamlazasiCimEpulet}`}
    </td>
  )
}
