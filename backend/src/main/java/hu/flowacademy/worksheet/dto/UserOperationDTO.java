package hu.flowacademy.worksheet.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserOperationDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
