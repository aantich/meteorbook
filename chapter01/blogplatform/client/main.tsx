import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {LoginRegistration} from '/imports/ui/Views/LoginRegistration';
import { EditPost } from '/imports/ui/Views/EditPost';
import { MainPage } from '/imports/ui/MainPage';

const router = createBrowserRouter([    
      {
        path: "login",
        element: <LoginRegistration />,
      },
      {
        path: "editpost",
        element: <EditPost />,
      },
      {
        path: "/",
        element: <MainPage />,
      }
    ])

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container!);
  
  root.render(<React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>);
});