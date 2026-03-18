
ALTER TABLE UserSubEvent
DROP CONSTRAINT FK_UsersSubEvents_User;
ALTER TABLE UserSubEvent
DROP CONSTRAINT FK_UserSubEvents_SubEvent;

Alter table UserSubEvent
ADD CONSTRAINT FK_UserSubEvent_User
FOREIGN KEY (UserId)
REFERENCES User(Id)
ON DELETE CASCADE;

Alter table UserSubEvent
ADD CONSTRAINT FK_UserSubEvent_SubEvent
FOREIGN KEY (SubEventId)
REFERENCES SubEvent(Id)
ON DELETE CASCADE;

Alter table UserSubEvent
ADD CONSTRAINT FK_UserSubEvent_UserSubEventStatus
FOREIGN KEY (UserSubEventStatusId)
REFERENCES UserSubEventStatus(Id);

