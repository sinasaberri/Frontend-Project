 const themeToggle = document.getElementById('theme-toggle');
        const addTaskBtn = document.getElementById('add-task-btn');
        const taskModal = document.getElementById('task-modal');
        const closeModal = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-btn');
        const saveTaskBtn = document.getElementById('save-task-btn');
        const modalTitle = document.getElementById('modal-title');
        const taskTitle = document.getElementById('task-title');
        const taskDescription = document.getElementById('task-description');
        const taskCategory = document.getElementById('task-category');
        const taskPriority = document.getElementById('task-priority');
        const taskDueDate = document.getElementById('task-due-date');
        const searchInput = document.getElementById('search-input');
        const toast = document.getElementById('toast');
        
        // Task containers
        const personalTasks = document.getElementById('personal-tasks');
        const workTasks = document.getElementById('work-tasks');
        const studyTasks = document.getElementById('study-tasks');
        
        // Stats elements
        const completedCount = document.getElementById('completed-count');
        const pendingCount = document.getElementById('pending-count');
        const overdueCount = document.getElementById('overdue-count');
        const personalCount = document.getElementById('personal-count');
        const workCount = document.getElementById('work-count');
        const studyCount = document.getElementById('study-count');

        // Sample initial tasks
        let tasks = [
            {
                id: 1,
                title: "Complete project proposal",
                description: "Finish the client proposal document with all specifications",
                category: "work",
                priority: "high",
                dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                completed: false
            },
            {
                id: 2,
                title: "Grocery shopping",
                description: "Buy fruits, vegetables, and Narges flower for AVA",
                category: "personal",
                priority: "medium",
                dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                completed: true
            },
            {
                id: 3,
                title: "Review UML concepts",
                description: "Study hooks, context Java, and state management",
                category: "study",
                priority: "low",
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                completed: false
            }
        ];

        let currentEditingTask = null;

        // Initialize the app
        document.addEventListener('DOMContentLoaded', () => {
            // Load tasks from localStorage if available
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                tasks = JSON.parse(savedTasks);
            }
            
            // Load theme preference
            const savedTheme = localStorage.getItem('darkTheme');
            if (savedTheme === 'true') {
                document.body.classList.add('dark-theme');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
            
            renderTasks();
            updateStats();
            
            // Set min date for due date to today
            const today = new Date().toISOString().split('T')[0];
            taskDueDate.min = today;
        });

        // Theme toggle functionality
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
            themeToggle.innerHTML = isDark ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
        });

        // Modal functionality
        addTaskBtn.addEventListener('click', () => {
            resetModal();
            modalTitle.textContent = 'Add New Task';
            saveTaskBtn.textContent = 'Add Task';
            taskModal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            taskModal.classList.remove('active');
        });

        cancelBtn.addEventListener('click', () => {
            taskModal.classList.remove('active');
        });

        // Close modal when clicking outside
        taskModal.addEventListener('click', (e) => {
            if (e.target === taskModal) {
                taskModal.classList.remove('active');
            }
        });

        // Save task functionality
        saveTaskBtn.addEventListener('click', () => {
            const title = taskTitle.value.trim();
            if (!title) {
                showToast('Task title is required!', 'error');
                return;
            }
            
            if (currentEditingTask) {
                // Update existing task
                const taskIndex = tasks.findIndex(t => t.id === currentEditingTask.id);
                tasks[taskIndex] = {
                    ...currentEditingTask,
                    title,
                    description: taskDescription.value.trim(),
                    category: taskCategory.value,
                    priority: taskPriority.value,
                    dueDate: taskDueDate.value
                };
                showToast('Task updated successfully!', 'success');
            } else {
                // Add new task
                const newTask = {
                    id: Date.now(),
                    title,
                    description: taskDescription.value.trim(),
                    category: taskCategory.value,
                    priority: taskPriority.value,
                    dueDate: taskDueDate.value,
                    completed: false
                };
                tasks.push(newTask);
                showToast('Task added successfully!', 'success');
            }
            
            // Save to localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            renderTasks();
            updateStats();
            taskModal.classList.remove('active');
        });

        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            renderTasks(searchTerm);
        });

        // Render tasks to the DOM
        function renderTasks(searchTerm = '') {
            // Clear containers
            personalTasks.innerHTML = '';
            workTasks.innerHTML = '';
            studyTasks.innerHTML = '';
            
            // Filter tasks based on search term
            let filteredTasks = tasks;
            if (searchTerm) {
                filteredTasks = tasks.filter(task => 
                    task.title.toLowerCase().includes(searchTerm) || 
                    (task.description && task.description.toLowerCase().includes(searchTerm))
                );
            }
            
            // Group tasks by category
            const personal = filteredTasks.filter(t => t.category === 'personal');
            const work = filteredTasks.filter(t => t.category === 'work');
            const study = filteredTasks.filter(t => t.category === 'study');
            
            // Render tasks for each category
            renderCategoryTasks(personal, personalTasks);
            renderCategoryTasks(work, workTasks);
            renderCategoryTasks(study, studyTasks);
        }

        // Render tasks for a specific category
        function renderCategoryTasks(categoryTasks, container) {
            if (categoryTasks.length === 0) {
                // Show empty state
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <i class="fas fa-tasks"></i>
                    <h3>No tasks here</h3>
                    <p>Add your first task to get started!</p>
                `;
                container.appendChild(emptyState);
                return;
            }
            
            categoryTasks.forEach(task => {
                const taskElement = createTaskElement(task);
                container.appendChild(taskElement);
            });
        }

        // Create task element
        function createTaskElement(task) {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskElement.dataset.taskId = task.id;
            
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
            
            taskElement.innerHTML = `
                <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                    <i class="fas fa-check"></i>
                </div>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                    <div class="task-meta">
                        ${task.dueDate ? `<div><i class="far fa-calendar"></i> ${formatDate(task.dueDate)}${isOverdue ? ' (Overdue)' : ''}</div>` : ''}
                        <div class="priority-${task.priority}"><i class="fas fa-flag"></i> ${task.priority}</div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-action-btn edit-btn" data-task-id="${task.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-action-btn delete-btn" data-task-id="${task.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            return taskElement;
        }

        // Update statistics
        function updateStats() {
            const completed = tasks.filter(t => t.completed).length;
            const pending = tasks.length - completed;
            const overdue = tasks.filter(t => 
                !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
            ).length;
            
            const personal = tasks.filter(t => t.category === 'personal').length;
            const work = tasks.filter(t => t.category === 'work').length;
            const study = tasks.filter(t => t.category === 'study').length;
            
            completedCount.textContent = completed;
            pendingCount.textContent = pending;
            overdueCount.textContent = overdue;
            
            personalCount.textContent = `${personal} ${personal === 1 ? 'task' : 'tasks'}`;
            workCount.textContent = `${work} ${work === 1 ? 'task' : 'tasks'}`;
            studyCount.textContent = `${study} ${study === 1 ? 'task' : 'tasks'}`;
        }

        // Format date for display
        function formatDate(dateString) {
            const options = { month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }

        // Reset modal form
        function resetModal() {
            taskTitle.value = '';
            taskDescription.value = '';
            taskCategory.value = 'personal';
            taskPriority.value = 'medium';
            taskDueDate.value = '';
            currentEditingTask = null;
        }

        // Show toast notification
        function showToast(message, type) {
            toast.textContent = message;
            toast.className = `toast ${type} show`;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Event delegation for task actions
        document.addEventListener('click', (e) => {
            // Toggle task completion
            if (e.target.closest('.task-checkbox')) {
                const taskElement = e.target.closest('.task-item');
                const taskId = parseInt(taskElement.dataset.taskId);
                const task = tasks.find(t => t.id === taskId);
                
                if (task) {
                    task.completed = !task.completed;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    renderTasks();
                    updateStats();
                    showToast(task.completed ? 'Task completed!' : 'Task marked as pending', 'success');
                }
            }
            
            // Edit task
            if (e.target.closest('.edit-btn')) {
                const taskId = parseInt(e.target.closest('.edit-btn').dataset.taskId);
                const task = tasks.find(t => t.id === taskId);
                
                if (task) {
                    currentEditingTask = task;
                    taskTitle.value = task.title;
                    taskDescription.value = task.description || '';
                    taskCategory.value = task.category;
                    taskPriority.value = task.priority;
                    taskDueDate.value = task.dueDate || '';
                    
                    modalTitle.textContent = 'Edit Task';
                    saveTaskBtn.textContent = 'Update Task';
                    taskModal.classList.add('active');
                }
            }
            
            // Delete task
            if (e.target.closest('.delete-btn')) {
                const taskId = parseInt(e.target.closest('.delete-btn').dataset.taskId);
                tasks = tasks.filter(t => t.id !== taskId);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
                updateStats();
                showToast('Task deleted successfully!', 'success');
            }
        });
