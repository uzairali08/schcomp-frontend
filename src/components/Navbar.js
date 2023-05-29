import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import  * as BiIcons from "react-icons/bi";
import  * as BsIcons from "react-icons/bs";
import  * as MdIcons from "react-icons/md";
import  * as SiIcons from "react-icons/si";
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';



function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const user = JSON.parse(localStorage.getItem("user-info"));

  const userRole = user.userrole;

  const showSidebar = () => setSidebar(!sidebar);

  // console.warn("the role is:" + userRole);

  const getMenuItems = (userRole) => {
    switch (userRole) {
      case 'Learner':
        return [
          {
            title: 'Quranic Subjects',
            path: '/QuranicSubjects',
            icon: <BsIcons.BsBook size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          {
            title: 'Visualize Quranic Subjects',
            path: '/Visualization',
            icon: <SiIcons.SiSololearn size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          // {
          //   title: 'Interactive Learning',
          //   path: '/InteractiveLearningSession',
          //   icon: <SiIcons.SiSololearn size={25} color="yellowgreen" />,
          //   cName: 'nav-text'
          // },
          // {
          //   title: 'Quizz',
          //   path: '/Quizz',
          //   icon: <MdIcons.MdOutlineQuiz size={25} color="yellowgreen" />,
          //   cName: 'nav-text'
          // },
          {
            title: 'My Courses',
            path: '/RegisteredCourses',
            icon: <MdIcons.MdOutlineQuiz size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          
          
        ];
      case 'Scholar':
        return [
          {
            title: 'Quranic Subjects',
            path: '/QuranicSubjects',
            icon: <BsIcons.BsBook size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          {
            title: 'Add Course',
            path: '/AddCourse',
            icon: <BsIcons.BsDatabaseAdd size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          {
            title: 'Add Objective Test',
            path: '/AddObjectiveTest',
            icon: <BsIcons.BsDatabaseAdd size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          {
            title: 'Add Subjective Test',
            path: '/AddSubjectiveTest',
            icon: <BsIcons.BsDatabaseAdd size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          {
            title: 'Edit Subjects',
            path: '/Subjects',
            icon: <BiIcons.BiEdit size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          {
            title: "Enrolled Learners",
            path: '/RegisteredCoursesList',
            icon: <FaIcons.FaRegIdBadge size={25} color="yellowgreen"/>,
            cName: 'nav-text'
          }
        ];
      case 'Admin':
        return [
          {
            title: "Statistics",
            path: '/StatisticsCharts',
            icon: <BiIcons.BiEdit size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          {
            title: "Manage Subjects",
            path: '/Subjects',
            icon: <BiIcons.BiEdit size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          {
            title: "Learner's Record",
            path: '/RegisteredLearners',
            icon: <FaIcons.FaRegIdBadge size={25} color="yellowgreen" />,
            cName: 'nav-text'
          },
          {
            title: "Scholars's Record",
            path: '/RegisteredScholars',
            icon: <FaIcons.FaRegIdBadge size={25} color="yellowgreen" />,
            cName: 'nav-text'
          }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems(userRole);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars className='FaBar' onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            {menuItems.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;





























// //combined two class work the same
// import React, { useState } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import { IconContext } from 'react-icons';

// function Navbar() {
//   const [sidebar, setSidebar] = useState(false);

//   const showSidebar = () => setSidebar(!sidebar);

//   const SidebarData = [
//     {
//       title: 'Subjects',
//       path: '/Subjects',
//       icon: <AiIcons.AiFillHome />,
//       cName: 'nav-text'
//     },
//     {
//       title: 'Interactive Learning',
//       path: '/InteractiveLearningSession',
//       icon: <IoIcons.IoIosPaper />,
//       cName: 'nav-text'
//     },
//     {
//       title: 'Offered Subjects',
//       path: '/OfferedSubjects',
//       icon: <FaIcons.FaCartPlus />,
//       cName: 'nav-text'
//     },
//     {
//       title: 'Quiz',
//       path: '/Quizz',
//       icon: <IoIcons.IoMdPeople />,
//       cName: 'nav-text'
//     },
//     {
//       title: 'Learners',
//       path: '/RegisteredLearners',
//       icon: <FaIcons.FaEnvelopeOpenText />,
//       cName: 'nav-text'
//     },
//     {
//       title: 'Quranic Subjects',
//       path: '/QuranicSubjects',
//       icon: <IoIcons.IoMdHelpCircle />,
//       cName: 'nav-text'
//     }
//   ];

//   return (
//     <>
//       <IconContext.Provider value={{ color: '#fff' }}>
//         <div className='navbar'>
//           <Link to='#' className='menu-bars'>
//             <FaIcons.FaBars className='FaBar' onClick={showSidebar} />
//           </Link>
//         </div>
//         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//           <ul className='nav-menu-items' onClick={showSidebar}>
//             {SidebarData.map((item, index) => {
//               return (
//                 <li key={index} className={item.cName}>
//                   <Link to={item.path}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }

// export default Navbar;











// import React, { useState } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import { SidebarData } from './SidebarData';
// import './Navbar.css';
// import { IconContext } from 'react-icons';

// function Navbar() {
//   const [sidebar, setSidebar] = useState(false);

//   const showSidebar = () => setSidebar(!sidebar);

//   return (
//     <>
//       <IconContext.Provider value={{ color: '#fff' }}>
//         <div className='navbar'>
//           <Link to='#' className='menu-bars'>
//             <FaIcons.FaBars className='FaBar' onClick={showSidebar} />
//           </Link>
//         </div>
//         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//           <ul className='nav-menu-items' onClick={showSidebar}>
//             {/* <li className='navbar-toggle'>
//               <Link to='#' className='menu-bars'>
//                 <AiIcons.AiOutlineClose />
//               </Link>
//             </li> */}
//             {SidebarData.map((item, index) => {
//               return (
//                 <li key={index} className={item.cName}>
//                   <Link to={item.path}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }

// export default Navbar;












// import React, { useState } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import { IconContext } from 'react-icons';

// function Navbar() {
//   const [sidebar, setSidebar] = useState(false);
//   const userRole = localStorage.getItem('userrole');

//   const showSidebar = () => setSidebar(!sidebar);

//   let sidebarData = [];

//   if (userRole === 'Learner') {
//     sidebarData = [
//       {
//         title: 'Quranic Subjects',
//         path: '/QuranicSubjects',
//         icon: <FaIcons.FaBookOpen />,
//         cName: 'nav-text'
//       },
//       {
//         title: 'Quiz',
//         path: '/Quizz',
//         icon: <AiIcons.AiOutlineFileDone />,
//         cName: 'nav-text'
//       },
//       {
//         title: 'Interactive Learning',
//         path: '/InteractiveLearningSession',
//         icon: <AiIcons.AiOutlinePlayCircle />,
//         cName: 'nav-text'
//       }
//     ];
//   } else if (userRole === 'Scholar') {
//     sidebarData = [
//       {
//         title: 'Subjects',
//         path: '/Subjects',
//         icon: <FaIcons.FaGraduationCap />,
//         cName: 'nav-text'
//       },
//       {
//         title: 'Offered Subjects',
//         path: '/OfferedSubjects',
//         icon: <AiIcons.AiOutlineSchedule />,
//         cName: 'nav-text'
//       }
//     ];
//   } else if (userRole === 'Admin') {
//     sidebarData = [
//       {
//         title: 'Learners',
//         path: '/RegisteredLearners',
//         icon: <AiIcons.AiOutlineUsergroupAdd />,
//         cName: 'nav-text'
//       }
//     ];
//   }

//   return (
//     <>
//       <IconContext.Provider value={{ color: '#fff' }}>
//         <div className='navbar'>
//           <Link to='#' className='menu-bars'>
//             <FaIcons.FaBars className='FaBar' onClick={showSidebar} />
//           </Link>
//         </div>
//         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//           <ul className='nav-menu-items' onClick={showSidebar}>
//             {sidebarData.map((item, index) => {
//               return (
//                 <li key={index} className={item.cName}>
//                   <Link to={item.path}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }

// export default Navbar;



















// import React, { useState } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import { IconContext } from 'react-icons';
// import { SidebarData } from './SidebarData';

// function Navbar() {
//   const [sidebar, setSidebar] = useState(false);
//   const userRole = localStorage.getItem('userRole');

//   const showSidebar = () => setSidebar(!sidebar);

//   return (
//     <>
//       <IconContext.Provider value={{ color: '#fff' }}>
//         <div className='navbar'>
//           <Link to='#' className='menu-bars'>
//             <FaIcons.FaBars className='FaBar' onClick={showSidebar} />
//           </Link>
//         </div>
//         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//           <ul className='nav-menu-items' onClick={showSidebar}>
//             {SidebarData(userRole).map((item, index) => {
//               return (
//                 <li key={index} className={item.cName}>
//                   <Link to={item.path}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }

// export default Navbar;
