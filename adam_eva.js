/**
 * Lớp Apple (Quả táo)
 */
function Apple() {
    // Thuộc tính riêng tư (sử dụng biến cục bộ trong closure)
    // Khối lượng mặc định là 10 đơn vị
    let weight = 10;

    // Phương thức để giảm khối lượng (ăn một miếng, 1 đơn vị)
    this.decrease = function() {
        if (weight > 0) {
            weight--;
        }
    };
    // Phương thức kiểm tra xem táo đã hết chưa (khối lượng bằng 0)
    // Trả về boolean
    this.isEmpty = function() {
        return weight === 0;
    };
    // Phương thức trả về khối lượng hiện tại (cho phép đối tượng khác xem)
    // Trả về int
    this.getWeight = function() {
        return weight;
    };
}
/**
 * Lớp Human (Người)
 */
function Human(name, gender, initialWeight) {
    // Thuộc tính riêng tư (sử dụng biến cục bộ trong closure)
    // name: Tên (String)
    // gender: Giới tính (Boolean, ví dụ: true cho nam, false cho nữ)
    // weight: Cân nặng (Int)
    let _name = name;
    let _gender = gender;
    let _weight = initialWeight || 0; // Đặt mặc định nếu không truyền vào

    // --- Các Phương Thức Công Khai ---

    // 1. Phương thức khởi tạo Human() - đã được tích hợp vào hàm Human(name, gender, initialWeight)

    // 2. isMale(): Kiểm tra xem có phải là nam không
    // Trả về boolean
    this.isMale = function() {
        // Giả định true là nam, false là nữ
        return _gender;
    };

    // 3. setGender(newGender): Đặt lại giới tính
    // newGender (boolean)
    this.setGender = function(newGender) {
        _gender = newGender;
    };

    // 4. checkApple(apple): Kiểm tra khối lượng của quả táo
    // apple: Đối tượng Apple
    // Trả về boolean (giả định trả về true nếu khối lượng > 0)
    this.checkApple = function(apple) {
        if (apple && typeof apple.getWeight === 'function') {
            let appleWeight = apple.getWeight();
            console.log(_name + " kiểm tra, khối lượng quả táo hiện tại là: " + appleWeight + " đơn vị.");
            return appleWeight > 0;
        }
        return false;
    };

    // 5. eat(apple): Ăn một miếng táo (1 đơn vị)
    // Tăng cân nặng lên 1, giảm khối lượng táo đi 1.
    // apple: Đối tượng Apple
    // Trả về void
    this.eat = function(apple) {
        // Chỉ ăn nếu táo chưa hết
        if (apple && typeof apple.getWeight === 'function' && apple.getWeight() > 0) {
            apple.decrease(); // Giảm khối lượng táo đi 1
            _weight++;        // Tăng cân nặng lên 1

            console.log(_name + " đã ăn một miếng táo.");
            console.log("-> Cân nặng của " + _name + " hiện tại là: " + _weight + " đơn vị.");
            console.log("-> Khối lượng táo còn lại: " + apple.getWeight() + " đơn vị.");
        } else {
            console.log(_name + " muốn ăn nhưng quả táo đã hết hoặc không hợp lệ.");
        }
    };

    // 6. say(message): Nói một chuỗi ký tự
    // message (String)
    // Trả về void
    this.say = function(message) {
        console.log(_name + " nói: \"" + message + "\"");
    };

    // 7. getName(): Lấy tên
    // Trả về String
    this.getName = function() {
        return _name;
    };

    // 8. setName(newName): Đặt lại tên
    // newName (String)
    // Trả về void
    this.setName = function(newName) {
        _name = newName;
    };

    // 9. getWeight(): Lấy cân nặng
    // Trả về int
    this.getWeight = function() {
        return _weight;
    };

    // 10. setWeight(newWeight): Đặt lại cân nặng
    // newWeight (int)
    // Trả về void
    this.setWeight = function(newWeight) {
        _weight = newWeight;
    };
}
// --- Mô phỏng Câu chuyện Adam và Eva ---

console.log("--- BẮT ĐẦU MÔ PHỎNG ADAM VÀ EVA ---");

// 1. Khởi tạo đối tượng
var apple = new Apple(); // Khối lượng mặc định: 10
var adam = new Human("Adam", true, 60);  // true = Nam, Cân nặng ban đầu 60
var eva = new Human("Eva", false, 55);  // false = Nữ, Cân nặng ban đầu 55

console.log("Táo được tạo với khối lượng ban đầu: " + apple.getWeight() + " đơn vị.");
console.log("Adam (Nam) được tạo với cân nặng ban đầu: " + adam.getWeight() + " đơn vị.");
console.log("Eva (Nữ) được tạo với cân nặng ban đầu: " + eva.getWeight() + " đơn vị.");
console.log("-------------------------------------");

var isAdamTurn = true;
var round = 1;

// 2. Mô phỏng luân phiên ăn táo cho đến khi hết
while (!apple.isEmpty()) {
    console.log("=== Vòng " + round + " ===");

    if (isAdamTurn) {
        // Lượt của Adam
        adam.say("Đến lượt ta ăn táo!");
        adam.eat(apple);

    } else {
        // Lượt của Eva
        eva.say("Đến lượt ta ăn táo!");
        eva.eat(apple);
    }

    // Đảo lượt cho người tiếp theo
    isAdamTurn = !isAdamTurn;
    round++;

    // Dùng checkApple để kiểm tra trạng thái
    if (!apple.isEmpty()) {
        adam.checkApple(apple); // Adam kiểm tra
    }
    console.log("-------------------------------------");
}

// 3. Kết quả sau khi táo đã hết
console.log("--- KẾT QUẢ CUỐI CÙNG ---");
console.log("Quả táo đã hết (Khối lượng: " + apple.getWeight() + ").");
console.log("Adam (Nam) kết thúc với cân nặng: " + adam.getWeight() + " đơn vị.");
console.log("Eva (Nữ) kết thúc với cân nặng: " + eva.getWeight() + " đơn vị.");
eva.say("Thật đáng tiếc, không còn táo nữa rồi!");

// Thử thêm một lần ăn sau khi hết
adam.eat(apple);