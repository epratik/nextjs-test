import {
  getJwtToken,
  getSub,
  getIdentityPoolSubId,
} from "../services/TokenService";
import AWS from "aws-sdk";
import { resolveHref } from "next/dist/shared/lib/router/router";

const userPoolId = "us-west-2_fWe5tW92W";
const clientId = "3n8d7fi84on54qibc1eac90qn4";
const identityPoolId = "us-west-2:f993f885-a9bb-486b-bd48-3ec2fc9a747b";
const region = "us-west-2";

export async function putdata(item) {
  var jwt = await getJwtToken();
  var data = {
    UserPoolId: userPoolId,
    ClientId: clientId,
  };
  try {
    AWS.config.region = region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId,
      Logins: {
        // Change the key below according to the specific region your user pool is in.
        [`cognito-idp.${AWS.config.region}.amazonaws.com/${data.UserPoolId}`]:
          jwt,
      },
    });

    AWS.config.credentials.get(async function (err) {
      if (!err) {
        var id = AWS.config.credentials.identityId;
        console.log("Cognito Identity ID " + id);

        // Instantiate aws sdk service objects now that the credentials have been updated
        var docClient = new AWS.DynamoDB.DocumentClient({
          region: AWS.config.region,
        });
        var params = {
          TableName: "kp-dynamodb-sitecontent",
          Item: item,
        };
        await docClient.put(params).promise();
      }
    });
  } catch (e) {
    console.log(e);
    return;
  }
}

export async function checkIfSiteAvailable(siteName) {
  var jwt = await getJwtToken();
  var data = {
    UserPoolId: userPoolId,
    ClientId: clientId,
  };
  try {
    AWS.config.region = region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId,
      Logins: {
        // Change the key below according to the specific region your user pool is in.
        [`cognito-idp.${AWS.config.region}.amazonaws.com/${data.UserPoolId}`]:
          jwt,
      },
    });

    let out = true;
    await new Promise((reject) => {
      AWS.config.credentials.get((err) => reject(err));
    });
    var id = AWS.config.credentials.identityId;

    var docClient = new AWS.DynamoDB.DocumentClient({
      region: AWS.config.region,
    });

    var params = {
      TableName: "kp-dynamodb-sitecontent",
      KeyConditionExpression: "site_name =:site_name",
      ExpressionAttributeValues: { ":site_name": siteName },
    };

    const result = await docClient.query(params).promise();

    if (
      result &&
      result.Items &&
      result.Items.length >= 1 &&
      result.Items[0].sub_id != (await getIdentityPoolSubId())
    ) {
      return false;
    } else return true;
  } catch (e) {
    console.log(e);
    return;
  }
}

export async function getSiteData(pk) {
  try {
    AWS.config.region = region;
    AWS.config.update({
      region: "us-west-2",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    // Instantiate aws sdk service objects now that the credentials have been updated
    var docClient = new AWS.DynamoDB.DocumentClient();
    // {
    //   region: AWS.config.region,
    //   endpoint: "dynamodb.us-west-2.amazonaws.com",
    //   credentials: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //     secretKeyId: process.env.AWS_SECRET_ACCESS_KEY,
    //   },
    // });

    var params = {
      TableName: "kp-dynamodb-sitecontent",
      Key: { site_name: pk },
    };

    const val = await docClient.get(params).promise();
    return val;
  } catch (e) {
    console.log(e);
    return;
  }
}