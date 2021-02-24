package hu.flowacademy.worksheet.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOperationDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
