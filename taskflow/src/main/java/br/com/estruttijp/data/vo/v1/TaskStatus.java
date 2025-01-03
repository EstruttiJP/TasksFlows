package br.com.estruttijp.data.vo.v1;

public enum TaskStatus {
    PENDING("pendente"),
    IN_PROGRESS("em andamento"),
    COMPLETED("concluída");

    private String status;

    TaskStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public static TaskStatus fromString(String status) {
        for (TaskStatus ts : values()) {
            if (ts.getStatus().equalsIgnoreCase(status)) {
                return ts;
            }
        }
        throw new IllegalArgumentException("Status desconhecido: " + status);
    }
}

