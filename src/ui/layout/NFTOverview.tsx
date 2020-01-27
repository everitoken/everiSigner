import * as React from 'react'
import { useSelector } from 'react-redux'
import { getMainAccount } from '../../store/getter'
import NFTListScreen from './NFTListScreen'
import { useTranslation } from 'react-i18next'

function FungibleOverview() {
  const { t } = useTranslation()
  const { account } = useSelector(getMainAccount)

  return <NFTListScreen title={t('NFTs_LIST')} publicKey={account.publicKey} />
}

export default FungibleOverview
