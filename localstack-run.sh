#!/bin/sh

awslocal ec2 create-key-pair \
    --key-name my-key \
    --query 'KeyMaterial' \
    --output text | tee key.pem

chmod 400 key.pem

awslocal ec2 authorize-security-group-ingress \
    --group-id default \
    --protocol tcp \
    --port 8000 \
    --cidr 0.0.0.0/0

sg_id=$(awslocal ec2 describe-security-groups | jq -r '.SecurityGroups[0].GroupId')

awslocal ec2 run-instances \
    --image-id ami-ff0fea8310f3 \
    --count 1 \
    --instance-type t3.nano --key-name my-key \
    --security-group-ids $sg_id \
    --user-data file://./run.sh

list_instances=$(awslocal ec2 describe-instances | jq -r '.Reservations[0].Instances[0].InstanceId')

awslocal ec2 terminate-instances --instance-id $list_instances