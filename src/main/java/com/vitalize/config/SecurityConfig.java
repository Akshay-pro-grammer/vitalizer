package com.vitalize.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;

import com.vitalize.services.impl.SecurityCustomUserDetailService;

@Configuration
public class SecurityConfig {
    // @Bean
    // public UserDetailsService userDetailsService(){
    //     UserDetails user1= User.withUsername("akshay").password("akshay").build();
    //     var inMemoryUserDetailsManager=new InMemoryUserDetailsManager(user1);
    //     return inMemoryUserDetailsManager;
    // }
    @Autowired
    private SecurityCustomUserDetailService customUserDetailService;
    @Autowired
    private OauthSuccessHandler handler;

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider=new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(customUserDetailService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(authorize->{
            authorize.requestMatchers("/meds/**").authenticated();
            authorize.requestMatchers("/aichat/**").authenticated();
            authorize.requestMatchers("/chat/**").authenticated();
            authorize.anyRequest().permitAll();
        });
        httpSecurity.formLogin(formLogin->{
            formLogin.loginPage("/login")
            .loginProcessingUrl("/authenticate")
            .defaultSuccessUrl("/home")
            // .failureForwardUrl("/login?error=true")
            .usernameParameter("email")
            .passwordParameter("password");
        });
        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        httpSecurity.logout(formLogout->{
            formLogout.logoutUrl("/logout")
            .logoutSuccessUrl("/login?logout=true");
        });
        httpSecurity.oauth2Login(oauth->{
            oauth.loginPage("/login");
            oauth.successHandler(handler);
        });
        return httpSecurity.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}

}
