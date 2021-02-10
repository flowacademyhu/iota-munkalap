package hu.flowacademy.worksheet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserOperationDTO {
    private String name;
    private String email;
    private String password;
}
