SELECT * FROM office.employee;

select e1.name as manager, e2.name as employee from office.employee as e1 join office.employee as e2 
on e1.id = e2.manager_id where e2.isManager != 1;

select IF(e1.name = e2.name , 'null', e1.name )as manager, e2.name as employee from 
office.employee as e1 join office.employee as e2 
on e1.id = e2.manager_id;

select e1.name from office.employee as e1 right outer join office.employee as e2 
on e1.id = e2.manager_id 
GROUP BY e1.id
HAVING COUNT(*) = 1;

select e1.name from office.employee as e1 left outer join office.employee as e2 
on e1.id = e2.manager_id 
where e2.name is null or
e2.name in 
(select e3.name from office.employee as e3 join office.employee as e4 
on e3.id = e4.manager_id 
GROUP BY e3.id
HAVING COUNT(*) = 1);

select e1.name, e1.isManager, count(e1.name) - 1 as num_of_employees from 
office.employee as e1 left outer join office.employee as e2 
on e1.id = e2.manager_id group by e1.name;