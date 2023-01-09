import React, { useCallback, useState } from 'react';
import { Box, Button, FormGroup, FormMessage, Input, Label, Modal } from '@adminjs/design-system';
import { isEmpty, length, matches } from 'class-validator';
import { useForm } from '../../hooks';
import { ApiClient, CurrentAdmin } from 'adminjs';

type ChangePasswordFormProps = {
  onClose: () => void,
  onSubmit: (password: string) => Promise<number>
}

const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const { onClose, onSubmit } = props;
  const { password, confirmPassword, onChange } = useForm({
    password: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

  const validatePassword = (password: string): string | undefined => {
    if (!length(password, 8, 50)) {
      return 'Must be longer than or equal to 8 and shorter than or equal to 50 characters';
    }

    if (!matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      return 'Must have at least one Uppercase, Lowercase, Special Character and Number';
    }

    return undefined;
  }

  // const hashPassword = async ( password: string ): Promise<string> => {
  //     let salt = await genSalt( 11 );
  //     return await hash( password, salt );
  // }

  const handleChangeClick = async () => {
    const errorMessage = validatePassword(password);

    if (errorMessage) {
      setPasswordError(errorMessage);
      return;
    }

    await onSubmit(password);

    onClose();
  };

  // const handleChangeClick = useCallback(async (password: string) => {
  //   const errorMessage = validatePassword(password); 

  //   if (errorMessage) {
  //     setPasswordError(errorMessage);
  //     return;
  //   }

  //   const hashedPassword = await hashPassword(password);
  //   const status = await onSubmit(hashedPassword);

  //   console.log({status});

  //   onClose();
  // }, []);

  return (
    <>
      <Box
        p={20}
        flexGrow={1}
        width={['100%', '100%', '480px']}
      >
        <FormGroup error={!!passwordError}>
          <Label required>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={({ target }) => onChange(target.value, "password")}
          />
          <FormMessage>{passwordError}</FormMessage>
        </FormGroup>
        <FormGroup>
          <Label required>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={({ target }) => onChange(target.value, "confirmPassword")}
          />
        </FormGroup>
      </Box>
      <Box
        flex
        flexDirection="row"
        justifyContent="flex-end"
      >
        <Button 
          mr="md" 
          mt="sm"
          label='Change'
          variant="primary"
          disabled={isEmpty(password) || password !== confirmPassword}
          onClick={() => handleChangeClick()}
        />
        <Button 
          mr="md" 
          mt="sm"
          label='Cancel'
          onClick={onClose}
        />
      </Box>
    </>
  )
}

type ChangePasswordModalProps = {
  isVisible: boolean,
  handleVisibility: (value: boolean) => void,
  admin: CurrentAdmin
}

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const { isVisible, handleVisibility, admin } = props;

  const handleChangePassword = async (password: string) => {
    const api = new ApiClient();
    const response = await api.recordAction({
      resourceId: "Admin",
      recordId: admin._id,
      actionName: "edit",
      data: { password }
    });

    return response.status;
  };

  const closeModal = useCallback(() => {
    handleVisibility(false);
  }, [handleVisibility]);

  if (!isVisible) return null;

  return (
    <Modal 
      label='Change Password'
      icon='Password'
      onOverlayClick={() => handleVisibility(false)}
      onClose={() => handleVisibility(false)}
    >
      <ChangePasswordForm 
        onSubmit={handleChangePassword}
        onClose={closeModal}
      />
    </Modal>
  )
}

export default ChangePasswordModal;