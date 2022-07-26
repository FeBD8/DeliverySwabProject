# DeliverySwabProject
(Complete project description in the presentation folder)
 
This project consists in the creation and implementation of an e-service. The service consists in let people to reserve the performing of a swab directly in their home; our organization sends a medical operator to the customer house that performs the swab test and then brings the swab to an external laboratory that analyzes it and gives back the result to our office that send it then to the customer. We Initially identifies three main external service that are used by our organization:

- Analyzely(the Laboratory): requesting and executing the swab analysis.
- Supplierly(a swab supplier): requesting and managing swab orders for refill.
- Bankly(a bank): requesting and managing payments.

At the beginning we created the **Archimate** model in which we focused on *Business*(service that are offered to the customer) and *Application*(The external services with which we support the business layer).

![image](https://user-images.githubusercontent.com/48360582/181099747-c1ac24e0-7824-4091-90bb-c1c3184c106e.png)


Then we identified 4 main sub-process on which perform the coreography and orchestration graphs : User Registration, User Login, Receive Order, Fulfill Order. The choreography diagram provides a high-level perspective focused only on the relationships among the organization, but without specifying the internal processes.

Example :
![image](https://user-images.githubusercontent.com/48360582/181100307-8ab347fd-a422-41fd-8d72-5d2d3bd626e9.png)


Orchestration concerns the management of activities executed under a common controlling element (the orchestrator). Usually, the boundary of an orchestrator is an organization. 

The orchestrator controls the execution of the business process according to a control-flow model. The control-flow is usually modelled based on a set of patterns.

Example :
![image](https://user-images.githubusercontent.com/48360582/181100990-e3c85305-2ab7-48fc-a69d-0fd844db273b.png)

