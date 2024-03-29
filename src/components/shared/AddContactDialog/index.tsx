import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@mui/material'
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'

import { auth } from '@/firebase'
import { useModal } from '@/hooks/useModal'

const AddContactDialog: React.FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const { selectedContactId } = useModal()
  const { t } = useTranslation()
  const db = getFirestore()

  const handleAddContact = async () => {
    if (!auth.currentUser) return

    const currentUserDocRef = doc(db, 'users', auth.currentUser.uid)

    await updateDoc(currentUserDocRef, {
      contacts: arrayUnion(selectedContactId)
    })
      .then(() => {
        console.log(t('contact_added'))
        onClose()
      })
      .catch(error => {
        console.error(t('error_contact_added'), error)
      })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('add_dialog_title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('add_dialog_description')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('disagree')}</Button>
        <Button onClick={handleAddContact} autoFocus>
          {t('agree')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddContactDialog
