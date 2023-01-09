import React, { useState } from 'react';
import { CurrentAdmin, useTranslation } from "adminjs";
import { CurrentUserNav, Box, CurrentUserNavProps } from '@adminjs/design-system';
import ChangePasswordModal from './password/ChangePassword';

export type LoggedInProps = {
  session: CurrentAdmin;
  paths: {
    logoutPath: string;
  };
}

const LoggedIn: React.FC<LoggedInProps> = (props: LoggedInProps) => {
  const { session, paths } = props;
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { translateButton } = useTranslation();

  const dropActions: CurrentUserNavProps['dropActions'] = [
    {
      label: "Change Password",
      onClick: (event: Event): void => {
        event.preventDefault();
        setIsChangingPassword(true);
      },
      icon: "Password",
    },
    {
      label: translateButton('logout'),
      onClick: (event: Event): void => {
        event.preventDefault();
        window.location.href = paths.logoutPath;
      },
      icon: 'Logout',
    }
  ];

  return (
    <Box flexShrink={0} data-css="logged-in">
      <CurrentUserNav
        name={session.email}
        title={session.title}
        avatarUrl={session.avatarUrl}
        dropActions={dropActions}
      />
      <ChangePasswordModal 
        isVisible={isChangingPassword} 
        handleVisibility={setIsChangingPassword} 
        admin={session}
      />
    </Box>
  )
}

export default LoggedIn;