package hu.flowacademy.worksheet.entity;

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


}

/*
ID
Partner: név, cím, elérhetőség (ha lesz már törzsadat)
Munkavégzés jellege: Telepítés, Javítás, Karbantartás, Egyéb (utolsó szabad szöveges, kitöltendő)
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