package com.zosh.response;

public class ApiResponse {

	private String message;
	private boolean status;
	
	public ApiResponse() {
		// TODO Auto-generated constructor stub
	}
	
	public ApiResponse(String message, boolean status) {
		super();
		this.message = message;
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	
}
