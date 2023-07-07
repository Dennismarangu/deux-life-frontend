import { createContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const AuthContext = createContext({
  isAuthenticated: false,
  customers: null,
  login: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customers, setCustomers] = useState(null);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const returnUrl = searchParams.get('returnUrl');

  const login = (customer) => {
    localStorage.setItem('customer', JSON.stringify(customer));
    setCustomers(customer);
    setIsAuthenticated(true);
    navigate(returnUrl ? returnUrl : '/');
  };

  const logout = () => {
    fetch(`/sessions/${customers?.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.removeItem('customer');
        setCustomers(null);
        setIsAuthenticated(false);
      });
  };

  useEffect(() => {
    const customer = localStorage.getItem('customer');

    if (customer) {
      setCustomers(JSON.parse(customer));
      setIsAuthenticated(true);
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, customers, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
