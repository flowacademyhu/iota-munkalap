package hu.flowacademy.worksheet.entity;

import hu.flowacademy.worksheet.enumCustom.AssetSettlement;
import hu.flowacademy.worksheet.enumCustom.TypeOfWork;
import hu.flowacademy.worksheet.enumCustom.WorkingTimeAccounting;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder(toBuilder = true)
@Table(name = "worksheetCustom")
public class Worksheet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //private Partner partner; szükséges lesz hozzá egy Partner osztály
    @Enumerated(EnumType.STRING)
    private TypeOfWork typeOfWork;
    @Enumerated(EnumType.STRING)
    private AssetSettlement assetSettlement;
    @Enumerated(EnumType.STRING)
    private WorkingTimeAccounting workingTimeAccounting;


}

/*
ID
Partner: név, cím, elérhetőség (ha lesz már törzsadat)


Eszköz elszámolás módja: Térítéses, Garanciális
Munkaidő elszámolás módja: Térítéses, Garanciális
Létszám: int fő
Rezsióra: float óra
Kiszállíás: float km
A munkalaphoz tartozó számla sorszáma: string
Az elvégzett munka leírása: szabadszöveges
Felhasznált anyagok: szabadszöveges
Fizetés módja: Készpénz, Átutalás
Kelt: date
Munkát végezte: e-aláírás
Munkavégzést igazolja: e-aláírás
*/