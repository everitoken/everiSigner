import * as React from 'react'
import styled from 'styled-components'
import CheckCircle from '@material-ui/icons/CheckCircle'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '../presentational/InlineButton'
import FlexContainer from '../presentational/FlexContainer'
import {
  RootRef,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import * as PasswordService from '../../service/PasswordService'

import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import InfoArea from '../presentational/InfoArea'
import labels from '../../labels'
import { importWallet } from '../action'

const DropZoneContainer = styled.div`
  width: 100%;
  padding: 32px 0;
  text-align: center;
  border: 5px #ececec dashed;
  box-sizing: border-box;
  background-color: ${({ isDragActive }: { isDragActive: boolean }) =>
    `rgba(236, 236, 236, ${isDragActive ? '0.4' : '0.8'})`};
`

function PaperDropzone() {
  const [fileContent, setFileContent] = React.useState<string | null>(null)
  const [showPassword, toggleShowPassword] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const onDrop = React.useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => alert(labels.IMPORT_WALLET_FAILED)
    reader.onerror = () => alert(labels.IMPORT_WALLET_FAILED)
    reader.onload = () => {
      const binaryStr = reader.result
      setFileContent(String(binaryStr))
    }

    acceptedFiles.forEach((file: any) => reader.readAsBinaryString(file))
  }, [])

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function handleClickShowPassword() {
    toggleShowPassword(!showPassword)
  }

  function handleImportWallet() {
    if (!password || !fileContent) {
      return
    }

    const rst = PasswordService.decrypt(password, fileContent)

    if (!rst.success) {
      alert(labels.IMPORT_WALLET_FAILED)
      return
    }

    dispatch(importWallet(rst.data as string))
    // TODO: refactor
    setTimeout(() => history.push('/'), 1000)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const { ref, ...rootProps } = getRootProps()

  return (
    <RootRef rootRef={ref}>
      <>
        <div
          {...rootProps}
          style={{ padding: '8px', width: 'calc(100% - 16px)' }}
        >
          <input {...getInputProps()} />
          <DropZoneContainer isDragActive={isDragActive}>
            {fileContent ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CheckCircle color="primary" />
                <p style={{ paddingLeft: '5px' }}>
                  {labels.WALLET_BACKUP_FILE_LOADED}
                </p>
              </div>
            ) : (
              <p>
                {isDragActive ? labels.FILE_DETECTED : labels.SELECT_OR_DND}
              </p>
            )}
          </DropZoneContainer>
        </div>

        <FlexContainer withPadding alignItems="stretch">
          <FormControl>
            <InputLabel htmlFor="password">
              {labels.INPUT_WALLET_RECOEVER_PASSWORD}
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password || ''}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <div style={{ paddingTop: '16px' }}>
            <Button
              disabled={!password || !fileContent}
              variant="contained"
              color="primary"
              onClick={handleImportWallet}
            >
              {labels.IMPORT_WALLET_BTN}
            </Button>
          </div>
        </FlexContainer>
      </>
    </RootRef>
  )
}

export default function WalletImportScreen() {
  return (
    <NavigationLayout
      title={labels.IMPORT_WALLET_TITLE}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <FlexContainer>
        <div style={{ width: '100%' }}>
          <InfoArea>
            <ul>
              <li>{labels.IMPORT_WALLET_DESCRIPTION_0}</li>
              <li>{labels.IMPORT_WALLET_DESCRIPTION_1}</li>
              <li>{labels.IMPORT_WALLET_DESCRIPTION_2}</li>
            </ul>
          </InfoArea>
        </div>
        <PaperDropzone />
      </FlexContainer>
    </NavigationLayout>
  )
}
