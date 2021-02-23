package hu.flowacademy.worksheet.dto;

import hu.flowacademy.worksheet.enumCustom.OrderType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PartnerDTO {

    private String partnerEmail;
    private String telefon;
    private OrderType megrendeloTipusa;
    private String nev;
    private String rovidNev;
    private String adoszam;
    private int kAdoszamTipus;
    private String bankszamlaszam;
    private String szamlazasiCimOrszagKod;
    private String szamlazasiCimOrszagNev;
    private String szamlazasiCimMegyeNev;
    private String szamlazasiCimIranyitoszam;
    private String szamlazasiCimTelepulesNev;
    private String szamlazasiCimKerulet;
    private String szamlazasiCimKozteruletNev;
    private String szamlazasiCimKozteruletJellegNev;
    private String szamlazasiCimHazszam;
    private String szamlazasiCimEpulet;
    private String szamlazasiCimLepcsohaz;
    private String szamlazasiCimSzint;
    private String szamlazasiCimAjto;
    private String szamlazasiCimHrsz;
}
