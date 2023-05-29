import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Subjects',
    path: '/Subjects',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Interactive Learning',
    path: '/InteractiveLearningSession',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Offered Subjects',
    path: '/OfferedSubjects',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Quiz',
    path: '/Quizz',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Learners',
    path: '/RegisteredLearners',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Quranic Subjects',
    path: '/QuranicSubjects',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];
