import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { CreateEncounterForm } from './CreateEncounterForm';

export interface CreateEncounterModalProps {}

export const CreateEncounterModal: FC<
	CreateEncounterModalProps
> = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button onClick={onOpen}>Add encounter</Button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<CreateEncounterForm onClose={onClose} />
				</ModalContent>
			</Modal>
		</>
	);
};
