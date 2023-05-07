package com.lxh.utils.image;

public class UpLoadFileState {
    public String filename;
    public int state;
    public UpLoadFileState setUpLoadFileState(String filename, int state) {
        this.filename = filename;
        this.state = state;
        return this;
    }
}
