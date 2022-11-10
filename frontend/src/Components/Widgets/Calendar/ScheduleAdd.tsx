import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { TimeInsertT } from './ScheduleDataType';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';

export default function ScheduleAdd(props: any) {
  const { showModal, handleClose, setSchedule, schedule } = props;
  const today = new Date();
  const sampledatetime = new Date(
    today.getFullYear() +
      '-' +
      ((today.getMonth() + 1) / 10 >= 1 ? '' : '0') +
      (today.getMonth() + 1) +
      '-' +
      (today.getDate() / 10 >= 1 ? '' : '0') +
      today.getDate() +
      'T00:00',
  );
  const [inputs, setInputs] = useState({
    title: '',
    startDate: sampledatetime,
    endDate: sampledatetime,
    content: '',
    color: 0,
  });

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const URLNext = `schedules`;

    const backURL = process.env.REACT_APP_BACKURL;
    if (checkTokenValidate()) {
      if (inputs.title == null || inputs.title == '') {
        alert('타이틀이 없습니다.');
      } else if (inputs.content == null || inputs.content == '') {
        alert('내용이 없습니다.');
      } else {
        if (inputs.startDate == null) {
          setInputs((values) => ({ ...values, startDate: sampledatetime }));
          inputs.startDate = sampledatetime;
        }
        if (inputs.endDate == null) {
          setInputs((values) => ({ ...values, endDate: sampledatetime }));
          inputs.endDate = sampledatetime;
        }
        if (inputs.color == null) {
          setInputs((values) => ({ ...values, color: 0 }));
        }
        fetch(backURL + URLNext, {
          method: 'POST',
          headers: {
            Authorization: getAccessToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        })
          .then((response) => response.json())
          .then((data) => {
            setSchedule([...schedule, inputs]);
            handleClose();
          });
      }
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>일정추가</Modal.Title>
      </Modal.Header>

      <Form>
        <Modal.Body>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="제목"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>색상</Form.Label>
            <Form.Select name="color" onChange={handleSelect} defaultValue={0}>
              <option value={0}>빨강</option>
              <option value={1}>파랑</option>
              <option value={2}>노랑</option>
              <option value={3}>검정</option>
              <option value={4}>초록</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>시작일</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startDate"
              onChange={handleChange}
              defaultValue={TimeInsertT('' + new Date() + '')}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>종료일</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endDate"
              onChange={handleChange}
              defaultValue={'' + new Date() + ''}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>세부일정</Form.Label>
            <Form.Control
              type="text"
              name="content"
              placeholder="세부일정"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            완료
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
