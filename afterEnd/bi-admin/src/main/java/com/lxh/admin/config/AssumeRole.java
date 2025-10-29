package com.lxh.admin.config;

import com.aliyun.auth.credentials.Credential;
import com.aliyun.auth.credentials.provider.StaticCredentialProvider;
import com.aliyun.sdk.service.sts20150401.models.*;
import com.aliyun.sdk.service.sts20150401.*;
import darabonba.core.client.ClientOverrideConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Component;

//import javax.net.ssl.KeyManager;
//import javax.net.ssl.X509TrustManager;
import java.util.concurrent.CompletableFuture;

@Component
@RefreshScope
public class AssumeRole {
    @Value("${aliyun.ak}")
    private String accessKeyId;
    @Value("${aliyun.sk}")
    private String accessKeySecret;
    @Value("${aliyun.roleArn}")
    private String roleArn;
    @Value("${aliyun.roleSessionName}")
    private String roleSessionName;

    public AssumeRoleResponse getAssumeRole () throws Exception {
        System.out.println("====");
        System.out.println(accessKeyId);
        System.out.println(accessKeySecret);
        System.out.println("====");
        // Configure Credentials authentication information, including ak, secret, token
        StaticCredentialProvider provider = StaticCredentialProvider.create(Credential.builder()
                // Please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_ID and ALIBABA_CLOUD_ACCESS_KEY_SECRET are set.
                .accessKeyId(accessKeyId)
                .accessKeySecret(accessKeySecret)
                //.securityToken(System.getenv("ALIBABA_CLOUD_SECURITY_TOKEN")) // use STS token
                .build());

        // Configure the Client
        AsyncClient client = AsyncClient.builder()
                //.httpClient(httpClient) // Use the configured HttpClient, otherwise use the default HttpClient (Apache HttpClient)
                .credentialsProvider(provider)
                //.serviceConfiguration(Configuration.create()) // Service-level configuration
                // Client-level configuration rewrite, can set Endpoint, Http request parameters, etc.
                .overrideConfiguration(
                        ClientOverrideConfiguration.create()
                                // Endpoint 请参考 https://api.aliyun.com/product/Sts
                                .setEndpointOverride("sts.cn-hangzhou.aliyuncs.com")
                        //.setConnectTimeout(Duration.ofSeconds(30))
                )
                .build();

        // Parameter settings for API request
        AssumeRoleRequest assumeRoleRequest = AssumeRoleRequest.builder()
                .durationSeconds(3600L)
                .roleArn(roleArn)
                .roleSessionName(roleSessionName)
                // Request-level configuration rewrite, can set Http request parameters, etc.
                // .requestConfiguration(RequestConfiguration.create().setHttpHeaders(new HttpHeaders()))
                .build();

        // Asynchronously get the return value of the API request
        CompletableFuture<AssumeRoleResponse> response = client.assumeRole(assumeRoleRequest);
        // Synchronously get the return value of the API request
        AssumeRoleResponse resp = response.get();
        client.close();
        return resp;

    }

}

