import { Box, H5, Text } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import React, { useEffect, useState } from 'react';
import { AppointmentsQuantityChart } from './AppointmentsQuantityChart';
import { EmergencyAvailableChart } from './EmergencyAvailableChart';
import { UsersQuantityChart } from './UsersQuantityChart';

function Dashboard(props: any) {
  const [usersQuantityByRole, setUsersQuantityByRole] = useState([0, 0]);
  const [appointmentsQuantity, setAppointmentsQuantity] = useState([]);
  const [emergencyAvailables, setEmergencyAvailables] = useState([0, 0]);

  const api = new ApiClient();

  const fetchData = async () => {
    const apiDashboard = await api.getDashboard();
    const apiData = apiDashboard.data;
	
	console.log({ apiData });
    
    const usersQuantities = apiData.usersQuantityByRole;
    const appointmentsQuantities = apiData.appointmentsQuantitiesPerDay;
    const emergencyAvailablesCount = apiData.emergencyAvailablesCount;

    setUsersQuantityByRole([usersQuantities.psychologistsCount, usersQuantities.patientsCount]);
    setAppointmentsQuantity(appointmentsQuantities);
    setEmergencyAvailables([emergencyAvailablesCount.availables, emergencyAvailablesCount.noAvailables]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Box position="relative" overflow="hidden" data-css="default-dashboard">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#E6896B"
            fillOpacity="1"
            d="M0,160L48,149.3C96,139,192,117,288,133.3C384,149,480,203,576,192C672,181,768,107,864,90.7C960,75,1056,117,1152,149.3C1248,181,1344,203,1392,213.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </Box>
      <Box
        mt={['xl', 'xl', '-100px']}
        mb="xl"
        mx={[0, 0, 0, 'auto']}
        px={['default', 'lg', 'xxl', '0']}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
        justifyContent="space-evenly"
      >
        <Box variant="white" boxShadow="card" width={1} m="lg">
          <AppointmentsQuantityChart data={appointmentsQuantity}/>
        </Box>
        <Box width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg" variant="white" boxShadow="card">
          <Text textAlign="center">
            <H5 mt="lg">Emergency Available Psychologies</H5>
          </Text>
          <EmergencyAvailableChart data={emergencyAvailables} />
        </Box>
        <Box width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg" variant="white" boxShadow="card">
          <Text textAlign="center">
            <H5 mt="lg">Users Quantities per Role</H5>
          </Text>
          <UsersQuantityChart data={usersQuantityByRole} />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
