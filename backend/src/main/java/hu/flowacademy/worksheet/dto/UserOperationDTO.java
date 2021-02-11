package hu.flowacademy.worksheet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserOperationDTO {
    private String first_name;
    private String last_name;
    private String email;
    private String password;
}
