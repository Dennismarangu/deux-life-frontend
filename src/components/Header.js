import { Button, Avatar } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export function Header () {
    return (
        <nav style={{ backgroundColor: 'rgb(248, 200, 220)', minWidth: '100vw' }}>
          <NavLink to="/signup" className="link">
            <Button backgroundColor="rgba(61, 245, 39, 0.39)" variant='solid' margin="5px" size="sm">
                Signup
            </Button>
          </NavLink>

          <NavLink to="/login" className="link">
            <Button backgroundColor="rgba(61, 245, 39, 0.39)" variant='solid' margin="5px" size="sm">
                Login
            </Button>
          </NavLink>

          {/*<NavLink to="/profile" className="link">
            <Avatar src='https://bit.ly/broken-link' />
    </NavLink>*/}

          <NavLink to="/logout" className="link">
            <Button backgroundColor="rgba(61, 245, 39, 0.39)" variant='solid' margin="5px" size="sm">
                Logout
            </Button>
          </NavLink>
        </nav>
      );
}