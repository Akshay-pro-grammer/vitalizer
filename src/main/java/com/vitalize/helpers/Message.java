package com.vitalize.helpers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Message {
    private String content;
    @Builder.Default
    private MessageType type=MessageType.blue;
}
