package br.com.estruttijp.data.vo.v1;

import java.io.Serializable;

public class StatusVO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String status; // Getters e Setters
	
	public String getStatus() { 
		return status; 
	} 
	
	public void setStatus(String status) { 
		this.status = status;
	}
}
