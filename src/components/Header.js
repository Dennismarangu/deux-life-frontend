import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export function Header () {
    return (
        <nav style={{ backgroundColor: 'rgb(248, 200, 220)', minWidth: '100vw', padding: '10px',
         }}>
          <NavLink to="/signup" className="link">
            <Button backgroundColor="rgb(255,165,0)" variant='solid' margin="5px" size="sm" fontWeight="bold" color="white" padding="10px" borderRadius="10px" _hover={{ color: 'black', backgroundColor: 'white' }}>
                Signup
            </Button>
          </NavLink>

          <NavLink to="/login" className="link">
            <Button backgroundColor="rgb(255,165,0)" variant='solid' margin="5px" size="sm" fontWeight="bold" color="white" padding="10px" borderRadius="10px" _hover={{ color: 'black', backgroundColor: 'white' }}>
                Login
            </Button>
          </NavLink>

          <NavLink to="/profile" className="link">
            <Button backgroundColor="rgb(255,165,0)" variant='solid' margin="5px" size="sm" fontWeight="bold" color="white" padding="10px" borderRadius="10px" _hover={{ color: 'black', backgroundColor: 'white' }}>
                View Profile
            </Button>
          </NavLink>

          <NavLink to="/logout" className="link">
            <Button backgroundColor="rgb(255,165,0)" variant='solid' margin="5px" size="sm" fontWeight="bold" color="white" padding="10px" borderRadius="10px" _hover={{ color: 'black', backgroundColor: 'white' }}>
                Logout
            </Button>
          </NavLink>
        </nav>
      );
}