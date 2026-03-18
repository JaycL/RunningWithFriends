INSERT INTO Participant (
    UserId,
    SubEventId,
    ParticipationStatusId,
	CreatedAt,
      CreatedBy,
      UpdatedAt,
      UpdatedBy
)
VALUES 
(2,76,4,GETDATE(),'Admin',GETDATE(),'Admin'),
(3,74,5,GETDATE(),'Admin',GETDATE(),'Admin'),
(4,75,3,GETDATE(),'Admin',GETDATE(),'Admin'),
(1,75,4,GETDATE(),'Admin',GETDATE(),'Admin'),
(3,76,6,GETDATE(),'Admin',GETDATE(),'Admin')
;

/*

  ,[UserId]
      ,[SubEventId]
      ,[CreatedAt]
      ,[CreatedBy]
      ,[UpdatedAt]
      ,[UpdatedBy]
      ,[ParticipationStatusId]

	  */