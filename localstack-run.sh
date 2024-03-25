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