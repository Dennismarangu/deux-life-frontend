import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export function Header () {
    return (
        <nav style={{ backgroundColor: 'transparent', minWidth: '100vw', padding: '10px',
         }}>
          <NavLink to="/signup" className="link">
            <Button variant='solid' margin="5px" size="sm" fontWeight="bold" color="black" padding="10px" borderRadius="10px" fontSize="md" _hover={{ color: 'white' }}>
                Signup
            </Button>
          </NavLink>

          <NavLink to="/login" className="link">
            <Button variant='solid' margin="5px" size="sm" fontWeight="bold" color="black" padding="10px" borderRadius="10px" _hover={{ color: 'white' }}>
                Login
            </Button>
          </NavLink>

          <NavLink to="/profile" className="link">
            <Button variant='solid' margin="5px" size="sm" fontWeight="bold" color="black" padding="10px" borderRadius="10px" _hover={{ color: 'white' }}>
                View Profile
            </Button>
          </NavLink>

          <NavLink to="/logout" className="link">
            <Button variant='solid' margin="5px" size="sm" fontWeight="bold" color="black" padding="10px" borderRadius="10px" _hover={{ color: 'white' }}>
                Logout
            </Button>
          </NavLink>
        </nav>
      );
}