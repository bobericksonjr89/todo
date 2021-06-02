# ToDo

A web application for todo lists and projects.

## Description

Users can input their own todo tasks and projects and have them saved in local storage.  Tasks have a color-coded priority, users can add them into project folders, assign due dates, and mark off tasks upon completion.  Each page has a sort bar where tasks can be sorted by completion status, priority, and due date.  Tasks can be deleted whenever users are ready, and edited to correct errors or update task descriptions, project, priority, and due dates.  

## Installation

The application has one depedency, date-fns, for processing dates into a reader-friendly format.  

## Structure

Task and project objects are constructed using factories, while application and DOM code are separated into ES6 modules files.  Everything is assembled with webpack. 

## Credit

Robert Erickson, 2021
