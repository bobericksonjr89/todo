(()=>{"use strict";const e=(e,t,n,o)=>({title:e,description:t,dueDate:n,priority:o,dateAdded:new Date(Date.now()),getTaskID:()=>TaskID,isComplete:!1,toggleCompletionStatus:function(){return!1===this.isComplete?this.isComplete=!0:this.isComplete=!1,this}});let t=0;const n=(e,n,o)=>{const s=new Date(Date.now()),a=t++,d=[];return{title:e,description:n,dueDate:o,dateAdded:s,getProjectID:()=>a,getTodoTasks:function(){return d},addTodoTask:function(e){d.push(e)},removeTodoTask:function(e){let t=e.getTaskID(),n=todoTask.findIndex((e=>e.getTaskID()===t));d.splice(n,1)}}},o=function(){const e=document.querySelector(".main-content");return{toggleActiveStatus:function(e,t){e.classList.toggle(t)},displayProjects:function(e,t){t.forEach((t=>{const n=document.createElement("button");n.classList.add("link","projects__project"),n.innerText=t.title,e.appendChild(n)}))},displayTasks:function(t){t.forEach((t=>{const n=document.createElement("div");n.classList.add("task");const o=document.createElement("div");o.classList.add("task__checkmark"),o.innerText="☐";const s=document.createElement("div");s.classList.add("task__title"),s.innerText=t.title;const a=document.createElement("div");a.classList.add("task__due-date"),a.innerText=t.dueDate;const d=document.createElement("button");d.classList.add("task__delete"),d.innerText="Delete",n.append(o,s,a,d),e.append(n)}))},clearMainContent:function(){console.log(e.childNodes);const t=e.childNodes;for(let n=t.length-1;n>0;n--)e.removeChild(t[n])}}}();(()=>{const t=[],s=[],a=e("clean","clean the whole house","tomorrow","1");window.item1=a,t.push(a);const d=e("work","work hard","yesterday","2");window.item2=d,t.push(d);const c=e("study","study all day","end of year","3");window.item3=c,t.push(c);const i=n("House Chores","daily house chores","Friday");window.proj1=i,s.push(i);const r=n("Make Todo App","work on it every day","May 20th");window.proj2=r,s.push(r),o.displayTasks(t);const l=document.querySelectorAll(".sidebar__link");function u(e){let n;e.target.className.includes("sidebar__projects")?(n=e.target.parentElement,o.displayProjects(n,s)):(n=e.target,o.displayTasks(t)),o.toggleActiveStatus(n,"sidebar--active")}document.querySelector("main-content"),l.forEach((e=>e.addEventListener("click",u)))})()})();