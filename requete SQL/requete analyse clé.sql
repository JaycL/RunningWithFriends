SELECT 
    fk.name,
    delete_referential_action_desc,
    update_referential_action_desc
FROM sys.foreign_keys fk
WHERE fk.parent_object_id = OBJECT_ID('Participant');

