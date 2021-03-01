package hu.flowacademy.worksheet.entity;

import hu.flowacademy.worksheet.enumCustom.OrderType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder(toBuilder = true)
@Table(name = "partnerCustom")
@EntityListeners(AuditingEntityListener.class)
public class Partner {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "partner_id", nullable = false)
    private String partnerId;
    @Column(name = "partner_email", nullable = false)
    private String partnerEmail;
    @Column(name = "telefon", nullable = false)
    private String telefon;
    @Enumerated(EnumType.STRING)
    @Column(name = "megrendelo_tipusa")
    private OrderType megrendeloTipusa;
    @Column(name = "nev", nullable = false)
    private String nev;
    @Column(name = "rovid_nev", nullable = false)
    private String rovidNev;
    @Column(name = "adoszam", nullable = false)
    private String adoszam;
    @Column(name = "k_adoszam_tipus", nullable = false)
    private int kAdoszamtipus;
    @Column(name = "bankszamlaszam", nullable = false)
    private String bankszamlaszam;
    @Column(name = "szamlazasi_cim_orszag_kod", nullable = false)
    private String szamlazasiCimOrszagKod;
    @Column(name = "szamlazasi_cim_orszag_nev", nullable = false)
    private String szamlazasiCimOrszagNev;
    @Column(name = "szamlazasi_cim_megye_nev", nullable = false)
    private String szamlazasiCimMegyeNev;
    @Column(name = "szamlazasi_cim_iranyitoszam", nullable = false)
    private String szamlazasiCimIranyitoszam;
    @Column(name = "szamlazasi_cim_telepules_nev", nullable = false)
    private String szamlazasiCimTelepulesNev;
    @Column(name = "szamlazasi_cim_kerulet")
    private String szamlazasiCimKerulet;
    @Column(name = "szamlazasi_cim_kozterulet_nev", nullable = false)
    private String szamlazasiCimKozteruletNev;
    @Column(name = "szamlazasi_cim_kozterulet_jelleg_nev", nullable = false)
    private String szamlazasiCimKozteruletJellegNev;
    @Column(name = "szamlazasi_cim_hazszam", nullable = false)
    private String szamlazasiCimHazszam;
    @Column(name = "szamlazasi_cim_epulet")
    private String szamlazasiCimEpulet;
    @Column(name = "szamlazasi_cim_lepcsohaz")
    private String szamlazasiCimLepcsohaz;
    @Column(name = "szamlazasi_cim_szint")
    private String szamlazasiCimSzint;
    @Column(name = "szamlazasi_cim_ajto")
    private String szamlazasiCimAjto;
    @Column(name = "szamlazasi_cim_hrsz")
    private String szamlazasiCimHrsz;
    @Column(name = "Aktív")
    private Boolean enabled;
}
