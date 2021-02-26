export default function partnerAddress({ partner }) {
  return (
    <td>
      {partner.szamlazasiCimIranyitoszam +
        ' ' +
        partner.szamlazasiCimTelepulesNev +
        ', ' +
        partner.szamlazasiCimKozteruletNev +
        ' ' +
        partner.szamlazasiCimKozteruletJellegNev +
        ' ' +
        partner.szamlazasiCimHazszam +
        ' ' +
        partner.szamlazasiCimEpulet}
    </td>
  )
}
