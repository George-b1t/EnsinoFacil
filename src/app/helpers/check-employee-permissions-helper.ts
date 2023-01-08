interface CheckEmployeePermissionsHelperProps {
  permissions: string[];
  permissionsToCheck: string[];
  role: string;
}

export class CheckEmployeePermissionsHelper {
  static execute(props: CheckEmployeePermissionsHelperProps): boolean {
    const { permissions, permissionsToCheck, role } = props;

    if (role === "administrator") return true;
    
    let hasPermission = true;
    
    for(let i = 0; i < permissionsToCheck.length; i++) {
      if (!permissions.includes(permissionsToCheck[i])) hasPermission = false;
    }
    
    return hasPermission;
  }
}
