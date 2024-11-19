import React from 'react';
import { FiEye, FiEdit, FiTrash, FiCheckCircle } from 'react-icons/fi';
import { Table, TitleTh, Tr, Td, Th, TitleTd, ActionContainer, ActionButton, DeleteButton, CompleteButton } from '../shared/StyledComponents';

const ToDoItemsList = ({ items, onView, onEdit, onDelete, onComplete, showCompleteButton, id }) => (
	<Table id={id}>
		<thead>
			<tr>
				<TitleTh>Title</TitleTh>
				<Th>Status</Th>
				<Th>Actions</Th>
			</tr>
		</thead>
		<tbody>
			{items.map((item) => (
				<Tr key={item.id}>
					<TitleTd>{item.title}</TitleTd>
					<Td>{item.status}</Td>
					<Td>
						<ActionContainer>
							<ActionButton onClick={() => onView(item)} data-cy={`view-button-${item.id}`}>
								<FiEye />
							</ActionButton>
							<ActionButton onClick={() => onEdit(item)} data-cy={`edit-button-${item.id}`}>
								<FiEdit />
							</ActionButton>
							<DeleteButton onClick={() => onDelete(item.id)} data-cy={`delete-button-${item.id}`}>
								<FiTrash />
							</DeleteButton>
							{showCompleteButton && (
								<CompleteButton onClick={() => onComplete(item.id)} data-cy={`complete-button-${item.id}`}>
									<FiCheckCircle /> Complete
								</CompleteButton>
							)}
						</ActionContainer>
					</Td>
				</Tr>
			))}
		</tbody>
	</Table>
);

export default ToDoItemsList;
