package hu.flowacademy.worksheet.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Partner {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "worksheet_id", nullable = false)
    private String id;
    @Column(name = "partner_email", nullable = false)
    private String partnerEmail;
    @Column(name = "nev", nullable = false)
    private String nev;
    @Column(name = "rovid_nev", nullable = false)
    private String rovidNev;
    @Column(name = "adoszam", nullable = false)
    private String adoszam;
    @Column(name = "k_adoszam_tipus", nullable = false)
    private Integer kAdoszamTipus;
    @Column(name = "bankszamlaszam", nullable = false)
    private String bankszamlaszam;



}


/*Partner részletes adatai:

Email: email
Telefon: string

Az alábbiak NAV kompatibilitás szerint kerülnek kibontásra! Mező neve, zárójelben a típusa majd leírás és ha van kieg. info.

Nev(string)[;]: Név
RovidNev(string)[;]: Rövid név
Adoszam(string)[;]: Adószám (8 számjegy hosszú, fixen)
KAdoszamTipus(integer)[;]: Adószám típus (1 számjegy, lehetséges értékek: 1 - 5)
Bankszamlaszam(string)[;]: Bankszámlaszám (2x vagy 3x 8 db számjegy, kötőjelekkel elválasztva)

SzamlazasiCimOrszagKod(string)[;]: Számlázási cím Ország kód (pl. "HU")
SzamlazasiCimOrszagNev(string)[;]: Számlázási cím Ország
SzamlazasiCimMegyeNev(string)[;]: Számlázási cím Megye
SzamlazasiCimIranyitoszam(string)[;]: Számlázási cím Irányítószám
SzamlazasiCimTelepulesNev(string)[;]: Számlázási cím Település
SzamlazasiCimKerulet(string)[;]: Számlázási cím Kerület
SzamlazasiCimKozteruletNev(string)[;]: Számlázási cím Közterület név
SzamlazasiCimKozteruletJellegNev(string)[;]: Számlázási cím Közterület jelleg (út, utca, tér, stb)
SzamlazasiCimHazszam(string)[;]: Számlázási cím Házszám
SzamlazasiCimEpulet(string)[;]: Számlázási cím Épület
SzamlazasiCimLepcsohaz(string)[;]: Számlázási cím Lépcsőház
SzamlazasiCimSzint(string)[;]: Számlázási cím Szint
SzamlazasiCimAjto(string)[;]: Számlázási cím Ajtó
SzamlazasiCimHrsz(string)[;]: Számlázási cím helyrajzi szám*/